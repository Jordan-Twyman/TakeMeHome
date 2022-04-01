using System;

namespace TakeMeHome.Models
{
    public class Home
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime ConstructedDate { get; set; }
        public string HomeType { get; set; }


    }
}
