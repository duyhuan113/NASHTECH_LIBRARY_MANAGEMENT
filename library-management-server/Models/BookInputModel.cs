using System.ComponentModel.DataAnnotations;

namespace R5.Models
{
    public class BookInputModel
    {
        [MaxLength(255)]
        public string Title { get; set; }

        [Range(1, int.MaxValue)]
        public int AuthorId { get; set; }

        [Range(1, int.MaxValue)]
        public int CategoryId { get; set; }
        
        public int Quantity { get; set; }
        [MaxLength(255)]
        public string ImgCover { get; set; }
    }
}
