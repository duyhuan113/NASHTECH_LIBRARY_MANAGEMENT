using System.ComponentModel.DataAnnotations;

namespace R5.Models
{
    public class UserInputModel
    {
        [MaxLength(255)]
        public string UserName { get; set; }

        [MaxLength(255)]
        public string Password { get; set; }
    }
}
