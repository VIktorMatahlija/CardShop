using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]

 
    public class CardShopController : ControllerBase
    {
        private readonly DataContext _context;

        public CardShopController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public void TestSetAll()
        {
            Card temp1 = new Card();
            temp1.CardName = "Test2";
            temp1.Artist = "Testor Pokusilović";
            temp1.Expansion = "Alpha";
            temp1.CardText = "This is the first ever MTG card";
            temp1.Rarity = "Rare";
            temp1.Type = "Creature";
            _context.Cards.Add(temp1);

            User temp2 = new User();
            temp2.Email = "test@test.hr";
            temp2.Password = "Password";
            temp2.Address = "home";
            temp2.Username = "admin";
            temp2.IsAdmin = true;
            _context.Users.Add(temp2);

            Inventory temp3 = new Inventory();
            temp3.OwnerId = temp2.Id;
            temp3.CardId = temp1.Id;
            temp3.Amount = 2;
            temp3.Price = 26.32;
            _context.Inventories.Add(temp3);

            Sale temp4 = new Sale();
            temp4.SellerId = temp2.Id;
            temp4.BuyerId = temp2.Id;
            temp4.Price = temp3.Price;
            temp4.SaleTime = DateTime.Now;
            _context.Sales.Add(temp4);

            _context.SaveChanges();
        }


        [HttpDelete]
        public async Task TestUnsetAll()
        {
            /*
             Nisam ovo jos testirao
             https://www.codeproject.com/Tips/5320939/Delete-All-Rows-in-a-Table-in-Entity-Framework-Cor
             string cmd = $"DELETE FROM {AnnotationHelper.TableName(dbSet)}";
             var context = dbSet.GetService<ICurrentDbContext>().Context;
             context.Database.ExecuteSqlRaw(cmd);
             return cmd;
             */
        }
    }

}

