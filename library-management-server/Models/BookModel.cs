namespace R5.Models
{
    public class BookModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Quantity { get; set; }
        public string ImgCover { get; set; }


        public virtual AuthorModel Author { get; set; }
        public virtual CategoryModel Category { get; set; }
    }
}
