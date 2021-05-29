using System.Collections.Generic;

namespace R5.Models
{

    public class Book : BaseEntity
    {
        public string Title { get; set; }
        public int AuthorId { get; set; }
        public virtual Author Author { get; set; }
        public int CategoryId { get; set; }
        public virtual Category Category { get; set; }
        public int Quantity { get; set; }
        public string ImgCover { get; set; }
        //public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }




    }
}
