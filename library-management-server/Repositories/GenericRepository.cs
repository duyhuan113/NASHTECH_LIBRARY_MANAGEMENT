using Microsoft.EntityFrameworkCore;
using R5.Data;
using R5.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace R5.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        protected readonly F5DbContext Context; 
        protected readonly DbSet<T> Entities;

        public GenericRepository(F5DbContext context)
        {
            this.Context = context;
            Entities = context.Set<T>();
        }

        public IEnumerable<T> GetAll(Expression<Func<T, object>>[] includes)
        {
            var query = Entities.AsQueryable();


            return includes.Aggregate(query, (current, include) => current.Include(include));
        }

        public T Get(int id)
        {
            return Entities.SingleOrDefault(s => s.Id == id);
        }
        public void Insert(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            Entities.Add(entity);
            Context.SaveChanges();
        }
        public void Update(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            Context.SaveChanges();
        }
        public void Delete(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            Entities.Remove(entity);
            Context.SaveChanges();
        }
    }
}
