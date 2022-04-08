﻿using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using TakeMeHome.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TakeMeHome.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UpkeepController : ControllerBase
    {
        private readonly IHomeUpkeepRepository _upkeepRepository;
        public UpkeepController(IHomeUpkeepRepository upkeepRepository)
        {
            //_upkeepProfileRepository = upkeepProfileRepository;
            _upkeepRepository = upkeepRepository;
        }
        // GET: api/<UpkeepController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet("/GetMyUpkeeps/{homeId}")]
        public IActionResult GetMyAreas(int homeId)
        {
            var home = _upkeepRepository.GetAllMyUpkeeps(homeId);
            return Ok(home);
        }

        // GET api/<UpkeepController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var upkeep = _upkeepRepository.GetById(id);
            if (upkeep == null)
            {
                return NotFound();
            }
            return Ok(upkeep);
        }



        // POST api/<UpkeepController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<UpkeepController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UpkeepController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
