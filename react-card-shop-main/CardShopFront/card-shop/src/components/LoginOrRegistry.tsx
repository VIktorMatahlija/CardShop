import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { User } from '../model/User';
import { Login } from '../store/action';
import { AppState } from '../store/interfaces';

interface IProps {
    isLogin: boolean,
}

interface IStateProps {
    User: User,
}

const LoginOrRegistry: React.FC<IProps> = ({isLogin}: IProps) => {
    
    const { User } = useSelector<AppState, IStateProps>((state: AppState) => {
        return {
          User: state.User
        };
      });
    
    const dispatch = useDispatch();
    var navigate = useNavigate();

    useEffect(() => {
        if(User.email != null){
            navigate("/Profile")
        }
      }, [User]);

      
    
    const submit = (x: any) => {
        x.preventDefault();
        dispatch(Login(dispatch, x.target.Username.value, x.target.Password.value));        
    };

    const Register = (x: any) => {
        x.preventDefault();
        axios.get("https://localhost:5001/Users/RegisterUser?Username=" + x.target.Username.value +
            "&Email=" + x.target.Email.value + "&Password=" + x.target.Password.value +
            "&Address=" + x.target.Address.value ).then(
            x => {setMessage(x.data)}
        );
    };

    

    const [Message, setMessage] = useState("");
    
    return (
        <div className='mainDiv'>
            {isLogin ? <>
                <form className='regularForm loginRegister' onSubmit={(e) => submit(e)}>
                    <label>Login</label>
                    <input type="text" required placeholder="Username or Email" name="Username" style={{width: "100%", padding: "5px", borderRadius: "4px"}}/>
                    <br/>
                    <input type="password" required placeholder="Password" name="Password" style={{width: "100%", padding: "5px", borderRadius: "4px"}}/>
                    <button type='submit'>
                        Submit
                    </button>
                </form>
                {Message != "" && <h1>{Message}</h1>}
                </>

                :
                <>
                <form className='regularForm loginRegister' onSubmit={(e) => Register(e)}>
                    <label>Register</label>
                    <input type="text" required placeholder="Username" name="Username" style={{width: "100%", padding: "5px", borderRadius: "4px"}}/>
                    <input type="text" required placeholder="Email" name="Email" style={{width: "100%", padding: "5px", borderRadius: "4px"}}/>
                    <input type="text" required placeholder="Address" name="Address" style={{width: "100%", padding: "5px", borderRadius: "4px"}}/>
                    <input type="password" required placeholder="Password" name="Password" style={{width: "100%", padding: "5px", borderRadius: "4px"}}/>
                    <button type='submit'>
                        Submit
                    </button>
                </form>           
                {Message != "" && <h1>{Message}</h1>}
                </> 
            }
        </div>
    );
};

export default LoginOrRegistry;

