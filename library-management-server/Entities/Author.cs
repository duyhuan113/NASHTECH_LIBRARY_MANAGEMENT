using System.Collections.Generic;

namespace R5.Models
{
    public class Author : BaseEntity
    {
        public string Name { get; set; }
        public virtual List<Book> Books { get; set; }
    }
}
