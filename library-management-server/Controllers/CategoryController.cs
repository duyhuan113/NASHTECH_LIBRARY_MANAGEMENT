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
    [Route("categories")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _repository;

        public CategoryController(ICategoryRepository repository)
        {
            _repository = repository;
        }


        // GET: api/<BookController>
        [Authorize(Roles = "admin")]
        [HttpGet("all")]
        public IEnumerable<Category> Get()
        {
            var list = _repository.GetAll(b => b.Books).AsEnumerable();
            return list;

        }


        [Authorize(Roles = "admin")]
        [HttpPost]
        public ActionResult Post(CategoryModel model)
        {
            Console.WriteLine(model);
            if (!ModelState.IsValid) return BadRequest();

            try
            {
                var listEntity = _repository.GetAll().ToList();


                for (var i = 0; i < listEntity.Count(); i++)
                {
                    var currentName = listEntity[i].Name;
                    if ((String.Compare(currentName, model.Name, true)) == 0)
                    {
                        return BadRequest("Category is Existed.");
                    }
                }

                var entity = new Category
                {
                    Name = model.Name,
                    CreatedDate = DateTime.Now
                };

                _repository.Insert(entity);

                return new JsonResult(entity);
            }
            catch (Exception ex)
            {
                return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
            }
        }

        [Authorize(Roles = "admin")]
        [HttpGet("{id}")]
        public Category Get(int Id)
        {
            Console.WriteLine(Id);

            var category = _repository.Get(Id);

            return category;
        }

        // PUT api/<BookController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int Id, CategoryModel model)
        {
            if (!ModelState.IsValid) return BadRequest();

            var entity = _repository.Get(Id);

            if (entity != null)
            {
                entity.Name = model.Name;
                entity.ModifiedDate = DateTime.Now;

                _repository.Update(entity);
                return Ok(entity);
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
            return BadRequest("Canot Found");
        }



    }
}
