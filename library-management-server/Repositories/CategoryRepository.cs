using R5.Data;
using R5.Models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;
namespace R5.Repositories
{
    public interface ICategoryRepository : IGenericRepository<Category>
    {
        IEnumerable<Category> GetAllInclude();

    }
    public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(F5DbContext context) : base(context)
        {
        }

        public IEnumerable<Category> GetAllInclude()
        {
            throw new NotImplementedException();
        }
    }
}
