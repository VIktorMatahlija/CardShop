namespace Domain
{

    public class User{
        
        public Guid Id { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Username { get; set; }

        public string Address { get; set; }

        public bool IsAdmin { get; set; }
        
    }

}