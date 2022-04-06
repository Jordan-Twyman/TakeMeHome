using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using TakeMeHome.Models;
using TakeMeHome.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TakeMeHome.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly IHomeInventoryRepository _inventoryRepository;
        public InventoryController(IHomeInventoryRepository inventoryRepository)
        {
            _inventoryRepository = inventoryRepository;
        }
        // GET: api/<InventoryController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<InventoryController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

    

        // POST api/<InventoryController>
        [HttpPost]
        public IActionResult Post(HomeInventory inventory)
        {
            _inventoryRepository.Add(inventory);
            return CreatedAtAction("Get", new { id = inventory.Id }, inventory);
        }

        // PUT api/<InventoryController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<InventoryController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
