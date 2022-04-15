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
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_inventoryRepository.GetAllInventory());
        }

        // GET api/<InventoryController>/5
        [HttpGet("{id}/{homeId}")]
        public IActionResult Get(int id, int homeId)
        {
            var inventory = _inventoryRepository.GetById(id, homeId);
            if (inventory == null)
            {
                return NotFound();
            }
            return Ok(inventory);
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
        public IActionResult Put(int id, HomeInventory inventory)
        {
            if (id != inventory.Id)
            {
                return BadRequest();
            }

            _inventoryRepository.UpdateInventory(inventory, id);
            return NoContent();
        }

        // DELETE api/<InventoryController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
