using System.Collections.Generic;

namespace R5.Models
{
    public class OrderDetail 
    {
        public int BookId { get; set; }
        public virtual Book Book { get; set; }

        public int ItemQuantity { get; set; }

        public int OrderId { get; set; }
        public virtual Order Order { get; set; }
    }
}
