using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using R5.Models;

namespace R5.Data
{
    public class F5DbContext : DbContext
    {



        public F5DbContext(DbContextOptions<F5DbContext> options) :
            base(options)
        {
        }

        protected F5DbContext()
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            //builder.Entity<Book>()
            //    .HasMany(b => b.Orders)
            //    .WithMany(od => od.Books);

            //builder.Entity<Order>()
            // .HasMany(o => o.Books)
            // .WithMany(od => od.Orders);

            builder.Entity<Book>()
                .HasMany(a => a.OrderDetails)
                .WithOne(b => b.Book)
                .HasForeignKey(b => b.BookId)
                .IsRequired();

            builder.Entity<Order>()
                .HasMany(a => a.OrderDetails)
                .WithOne(b => b.Order)
                .HasForeignKey(b => b.OrderId)
                .IsRequired();

            builder.Entity<OrderDetail>()
                .HasKey(od => new { od.OrderId, od.BookId });


            builder.Entity<Author>()
                .HasMany(a => a.Books)
                .WithOne(b => b.Author)
                .HasForeignKey(b => b.AuthorId)
                .IsRequired();

            builder.Entity<Category>()
                .HasMany(c => c.Books)
                .WithOne(b => b.Category)
                .HasForeignKey(b => b.CategoryId)
                .IsRequired();



            builder.Entity<User>()
                .HasMany(u => u.Orders)
                .WithOne(o => o.User)
                .HasForeignKey(u => u.UserId);



            builder.Entity<User>()
                .HasData(
                new { Id = 1, UserName = "admin", Password = "123", Role = "admin", CreatedDate = DateTime.Now },
                new { Id = 2, UserName = "user1", Password = "123", Role = "user", CreatedDate = DateTime.Now },
                new { Id = 3, UserName = "user2", Password = "123", Role = "user", CreatedDate = DateTime.Now }
                );

            builder.Entity<Category>()
                .HasData(
                new Category { Id = 1, Name = "Comic", CreatedDate = DateTime.Now },
                new Category { Id = 2, Name = "Anime", CreatedDate = DateTime.Now },
                new Category { Id = 3, Name = "Fiction", CreatedDate = DateTime.Now }
                );

            builder.Entity<Book>()
             .HasData(
              new Book { Id = 1, Title = "Conan", AuthorId = 3, CategoryId = 1, CreatedDate = DateTime.Now, Quantity = 10 ,ImgCover= "https://firstnews.com.vn/public/uploads/products/dac-nhan-tam-biamem2019-76k-bia1.jpg" },
              new Book { Id = 2, Title = "Doremon", AuthorId = 1, CategoryId = 2, CreatedDate = DateTime.Now, Quantity = 10, ImgCover = "https://firstnews.com.vn/public/uploads/products/dac-nhan-tam-biamem2019-76k-bia1.jpg" },
              new Book { Id = 3, Title = "Dragon Balls", AuthorId = 2, CategoryId = 3, CreatedDate = DateTime.Now, Quantity = 10, ImgCover = "https://firstnews.com.vn/public/uploads/products/dac-nhan-tam-biamem2019-76k-bia1.jpg" }
             );

            builder.Entity<Author>()
               .HasData(
                new Author { Id = 1, Name = "Huan", CreatedDate = DateTime.Now },
                new Author { Id = 2, Name = "Duy", CreatedDate = DateTime.Now },
                new Author { Id = 3, Name = "Bui", CreatedDate = DateTime.Now }
               );

            builder.Entity<Order>()
                .HasData(
                 new Order { Id = 1, Status = "waiting", UserId = 1, CreatedDate = DateTime.Now },
                 new Order { Id = 2, Status = "waiting", UserId = 1, CreatedDate = DateTime.Now },
                 new Order { Id = 3, Status = "waiting", UserId = 2, CreatedDate = DateTime.Now }
                );

            builder.Entity<OrderDetail>()
               .HasData(
                new OrderDetail { BookId = 1, OrderId = 1, ItemQuantity = 1 },
                new OrderDetail { BookId = 2, OrderId = 2, ItemQuantity = 1 },
                new OrderDetail { BookId = 3, OrderId = 3, ItemQuantity = 3 }
               );

        }

    }
}
