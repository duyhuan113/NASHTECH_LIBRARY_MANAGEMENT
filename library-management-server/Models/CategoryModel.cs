namespace R5.Models
{
    public class CategoryModel
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual BookModel Book { get; set; }
    }
}
