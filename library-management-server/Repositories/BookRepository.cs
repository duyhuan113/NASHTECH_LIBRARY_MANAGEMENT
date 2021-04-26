using R5.Data;
using R5.Models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;

namespace R5.Repositories
{
    public interface IBookRepository : IGenericRepository<Book>
    {
        IEnumerable<Book> GetAllInclude();
        IEnumerable<Book> GetAllByAuthorId(int authorId);
        Book UpdateQuantity(bool ActionType, int Id, int Quantity);
    }

    public class BookRepository : GenericRepository<Book>, IBookRepository
    {
        public BookRepository(F5DbContext context) : base(context)
        {
        }

        public IEnumerable<Book> GetAllInclude()
        {
            return Entities
                .Include(b => b.Author)
                .Include(b => b.Category)
                .AsEnumerable();
        }

        public IEnumerable<Book> GetAllByAuthorId(int authorId)
        {
            Console.WriteLine(authorId);
            return Entities.Where(b => b.AuthorId == authorId).ToList();
        }

        public Book UpdateQuantity(bool ActionType, int Id, int Quantity)
        {
            var book = Entities.FirstOrDefault(b => b.Id == Id);

            if (ActionType)
            {
                if (book.Quantity <= Quantity)
                {
                    return null;
                }
                book.Quantity = book.Quantity - Quantity;
            }
            else
            {
                book.Quantity = book.Quantity + Quantity;
            }

            return book;
        }
    }
}
