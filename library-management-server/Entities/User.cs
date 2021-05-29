using System.Collections.Generic;

namespace R5.Models
{

    public class User : BaseEntity
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public ICollection<Order> Orders { get; set; }
    }
}