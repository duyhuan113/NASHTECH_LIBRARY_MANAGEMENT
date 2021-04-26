using System.Collections.Generic;

namespace R5.Models
{
    public class Category: BaseEntity
    {
        public string Name { get; set; }
        public virtual ICollection<Book> Books { get; set; }
    }
}
