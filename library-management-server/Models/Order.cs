using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace R5.Models
{

    public class Order : BaseEntity
    {
        public string Status { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }

        public static explicit operator Order(BadRequestObjectResult v)
        {
            throw new NotImplementedException();
        }
    }
}