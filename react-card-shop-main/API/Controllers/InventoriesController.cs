using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]


    public class InventoriesController : ControllerBase
    {
        private readonly DataContext _context;

        public InventoriesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Inventory>>> getAllInventories()
        {
            return await _context.Inventories.ToListAsync();
        }

        [HttpPost]
        public void addItem(Inventory item) {
            _context.Inventories.Add(item);
            _context.SaveChanges();
        }

        [HttpPost]
        public void DeleteInventory(Inventory item)
        {

            _context.Inventories.Remove(item);
            _context.SaveChanges();
        }

        [HttpGet]
        public async Task<List<Inventory>> getInventoriesByUserID(Guid id) {
            return  await _context.Inventories.Where(x => x.OwnerId == id).ToListAsync();
        }

        [HttpGet]
        public async Task<List<Inventory>> getInventoriesByCardID(Guid id)
        {
            return await _context.Inventories.Where(x => x.CardId == id).ToListAsync();
        }

    }

}

