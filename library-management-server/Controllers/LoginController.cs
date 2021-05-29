using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using R5.Models;
using R5.Repositories;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace R5.Controllers
{
    public static class Settings
    {
        public static string Secret = "daylakeaosjasdasdkakjshdashdkybimat";
    }
    public static class TokenService
    {
        public static string CreateToken(User user)
        {
            var key = Encoding.UTF8.GetBytes(Settings.Secret);
            var tokenHandler = new JwtSecurityTokenHandler();
            var descriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserName.ToString()),
                    new Claim(ClaimTypes.Role, user.Role.ToString()),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddMinutes(100),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(descriptor);
            return tokenHandler.WriteToken(token);
        }
    }


    [Route("user")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IGenericRepository<User> _repository;

        public LoginController(IGenericRepository<User> repository)
        {
            _repository = repository;
        }

        // POST 
        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<ActionResult<dynamic>> Authenticate(User model)
        {
            try
            {
                var user = _repository.GetAll().FirstOrDefault(u => u.UserName == model.UserName && u.Password == model.Password);

                if (user == null)
                    return NotFound("User or Password Invalid.");

                var token = TokenService.CreateToken(user);
                return token;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error Create Token.");
            }
        }

        [HttpGet("all")]
        public ActionResult<List<User>> GetAll()
        {
            try
            {
                var user = _repository.GetAll(u => u.Orders).ToList();
                return user;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error Create Token.");
            }

        }

        [HttpGet("{id}")]
        public ActionResult<List<User>> GetById(int id)
        {
            try
            {
                var user = _repository.GetAll(u => u.Orders).Where(o => o.Id == id).ToList();
                return user;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error Create Token.");
            }
        }
    }
}
