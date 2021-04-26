using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using R5.Models;
using R5.Repositories;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace R5.Controllers
{
    [Route("books")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _repository;

        public BookController(IBookRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<BookController>
        [Authorize(Roles ="user,admin")]
        [HttpGet("all")]
        public IEnumerable<BookModel> Get()
        {
            return _repository.GetAll(b => b.Author, b => b.Category).Select(b => new BookModel
            {
                Id = b.Id,
                Title = b.Title,
                Quantity = b.Quantity,
                ImgCover = b.ImgCover,
                Author = b.Author != null ? new AuthorModel
                {
                    Id = b.Author.Id,
                    Name = b.Author.Name
                } : null,
                Category = b.Category != null ? new CategoryModel
                {
                    Id = b.Category.Id,
                    Name = b.Category.Name
                } : null
            }).AsEnumerable();
        }

        [Authorize(Roles = "admin")]
        [HttpGet("{id}")]
        public Book Get(int Id)
        {
            Console.WriteLine(Id);

            var book = _repository.Get(Id);

            return book;
        }

       



       
        // POST 
        [HttpPost]
        public ActionResult Post(BookInputModel model)
        {
            Console.WriteLine(model);
            if (!ModelState.IsValid) return BadRequest();

            try
            {
                Console.WriteLine(model);
                var entity = new Book
                {
                    Title = model.Title,
                    AuthorId = model.AuthorId,
                    CategoryId = model.CategoryId,
                    Quantity = model.Quantity,
                    ImgCover = model.ImgCover,
                    CreatedDate = DateTime.Now
                };

                _repository.Insert(entity);

                return new JsonResult(entity);
            }
            catch (Exception)
            {
                return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
            }
        }

        // PUT api/<BookController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int Id, BookInputModel model)
        {
            if (!ModelState.IsValid) return BadRequest();

            var book = _repository.Get(Id);

            if (book != null)
            {
                book.Title = model.Title;
                book.CategoryId = model.CategoryId;
                book.AuthorId = model.AuthorId;
                book.ImgCover = model.ImgCover;
                book.Quantity = model.Quantity;

                _repository.Update(book);
                return Ok(book);
            }

            return BadRequest();
        }

        // DELETE api/<BookController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int Id)
        {
            if (!ModelState.IsValid) return BadRequest();

            var entity = _repository.Get(Id);
            if (entity != null)
            {
                _repository.Delete(entity);
                return Ok("Delete Success");
            }

            return BadRequest();

        }
    }
}
