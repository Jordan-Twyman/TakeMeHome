using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using TakeMeHome.Models;
using TakeMeHome.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TakeMeHome.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly IHomeRepository _homeRepository;
        public HomeController(IHomeRepository homeRepository)
        {
            //_homeProfileRepository = homeProfileRepository;
            _homeRepository = homeRepository;
        }
        // GET: api/<HomeController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<HomeController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpGet("/GetMyHome/{id}")]
        public IActionResult GetMyHome(int id)
        {
            var home = _homeRepository.GetHomeWithInventoryandUpkeep(id);
            if (home == null)
            {
                return NotFound();
            }
            return Ok(home);
        }

        [HttpGet("GetByEmail")]
        public IActionResult GetByEmail(string email)
        {
            var user = _homeRepository.GetByEmail(email);

            if (email == null || user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // POST api/<HomeController>
        [HttpPost]
        public IActionResult Post(Home home)
        {
           
                _homeRepository.Add(home);
                return CreatedAtAction(
                    "GetByEmail",
                    new { email = home.Email },
                    home);
            

        }

        // PUT api/<HomeController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<HomeController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
