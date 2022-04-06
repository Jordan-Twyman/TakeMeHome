using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using TakeMeHome.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TakeMeHome.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AreaController : ControllerBase
    {

        private readonly IAreaRepository _areaRepository;
        public AreaController(IAreaRepository areaRepository)
        {
            //_areaProfileRepository = areaProfileRepository;
            _areaRepository = areaRepository;
        }
        // GET: api/<AreaController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_areaRepository.GetAllAreas());
        }

        // GET api/<AreaController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpGet("/GetMyAreas/{homeId}")]
        public IActionResult GetMyAreas(int homeId)
        {
            var home = _areaRepository.GetAllAreasWithMyInventory(homeId);
            return Ok(home);
        }

        // POST api/<AreaController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<AreaController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<AreaController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
