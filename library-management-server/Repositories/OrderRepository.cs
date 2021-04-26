using R5.Data;
using R5.Models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;

namespace R5.Repositories
{
    public interface IOrderRepository : IGenericRepository<Order>
    {
        IEnumerable<Order> GetAllByUserId(int userId);

        Order GetOneById(int Id);

    }

    public class OrderRepository : GenericRepository<Order>, IOrderRepository
    {
        public OrderRepository(F5DbContext context) : base(context)
        {
        }

        public Order GetOneById(int Id)
        {
            return (Order)Entities
                .Include(a => a.OrderDetails)
                    .ThenInclude(o => o.Book).FirstOrDefault(a => a.Id == Id);
        }

        IEnumerable<Order> IOrderRepository.GetAllByUserId(int userId)
        {
            return Entities.Where(b => b.UserId == userId).AsEnumerable();
        }
    }
}
