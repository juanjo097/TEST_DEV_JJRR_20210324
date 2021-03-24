using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PruebaDev.Models;

namespace PruebaDev.Repositories
{
    public static class UserRepository
    {
        public static User Get(string username, string password)
        {
            var users = new List<User>();
            users.Add(new User { Id = 1, Username = "admin", 
                                 Password = "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9", 
                                 Role = "admin" });
            users.Add(new User { Id = 2, Username = "user", 
                                 Password = "e606e38b0d8c19b24cf0ee3808183162ea7cd63ff7912dbb22b5e803286b4446", 
                                 Role = "employee" });
            return users.Where(x => x.Username.ToLower() == username.ToLower() && x.Password == password).FirstOrDefault();
        }
    }
}
