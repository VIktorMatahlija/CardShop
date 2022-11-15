using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application;
using System.Linq;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]


    public class SalesController : ControllerBase
    {
        private readonly DataContext _context;

        public SalesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Sale>>> getAllSales()
        {
            return await _context.Sales.ToListAsync();
        }
        [HttpGet]
        public async Task<ActionResult<List<Sale>>> getHotSales()
        {
            return await _context.Sales.OrderByDescending(x=>x.Price).Take(10).ToListAsync();
        }
   
        [HttpPost]
        public async Task processPurchase(List<Sale> sales) {
            
            foreach (var item in sales) { 
                _context.Sales.Add(item);
                _context.SaveChanges();
            }
        }

    }


}

