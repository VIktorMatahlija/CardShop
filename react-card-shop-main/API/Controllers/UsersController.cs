using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]


    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;

        public UsersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> getAllUsers()
        {
            return await _context.Users.ToListAsync();
        }

        [HttpGet]
        public string RegisterUser(string Username, string Email, string Password, string Address)
        {
            User temp = new User();
            temp.Username = Username;
            temp.Email = Email;
            temp.Password = Hasher.Hash(Password);
            temp.Address = Address;
            temp.IsAdmin = false;

            if (_context.Users.Where(x => x.Username == temp.Username).Count() == 0 &&
                _context.Users.Where(x => x.Email == temp.Email).Count() == 0)
            {
                _context.Users.Add(temp);
                _context.SaveChanges();
                return "Success";
            }
            else
                return "Fail";
        }



        [HttpGet]
        public User LoginUser(string UsernameOrEmail, string Password)
        {
            User temp = new User();
            List<User> x = new List<User>();
            temp.Username = UsernameOrEmail;
            temp.Email = UsernameOrEmail;
            temp.Password = Hasher.Hash(Password);

            if (_context.Users.Where(_x => _x.Username == temp.Username).Count() > 0)
            {
                x = _context.Users.Where(_x => _x.Username == temp.Username).ToList();
            }
            if (_context.Users.Where(_x => _x.Email == temp.Email).Count() > 0)
            {
                x = _context.Users.Where(_x => _x.Email == temp.Email).ToList();
            }

            if (x.Count() > 0)
            {
                if (x[0].Password == temp.Password)
                    return x[0];
                else
                    return new User();
            }
            else
            {
                return new User();
            }


        }

        [HttpGet]
        public List<User> searchUser(string name)
        {
            return _context.Users.Where(x => x.Username.ToLower().Contains(name.ToLower())).ToList();
        }

        [HttpPost]
        public void SetAdmin(User user)
        {

            user.IsAdmin = true;

            _context.Users.Update(user);
            _context.SaveChanges();
        }


    }
    

}

