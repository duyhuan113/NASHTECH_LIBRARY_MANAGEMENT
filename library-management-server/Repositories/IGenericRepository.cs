using System;
using R5.Models;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace R5.Repositories
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        IEnumerable<T> GetAll(params Expression<Func<T, object>>[] include);
        T Get(int id);
        void Insert(T entity);
        void Update(T entity);
        void Delete(T entity);
    }
}
