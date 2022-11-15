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


    public class CardsController : ControllerBase
    {
        private readonly DataContext _context;

        public CardsController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<Card>>> getAllCards()
        {
            return await _context.Cards.ToListAsync();
        }

        [HttpGet]
        public List<Card> getHotCards()
        {
            var sales = _context.Sales.OrderByDescending(x => x.Price).ToList();
            var guids = sales.Select(x => x.CardId.ToString().ToLower()).ToList();
            var result = _context.Cards.ToList();
            List<Card> cards = new List<Card>();
            foreach (Card c in result) {
                if (guids.Contains(c.Id.ToString())) { 
                    cards.Add(c);
                }
            }
            return cards;
        }

        [HttpPost]
        public void TestSetCard(string Name, string Artist, string Expansion, string Text, string Rarity, string Type)
        {
            Card temp = new Card();
            temp.CardName = Name;
            temp.Artist = Artist;
            temp.Expansion = Expansion;
            temp.CardText = Text;
            temp.Rarity = Rarity;
            temp.Type = Type;
            _context.Cards.Add(temp);
            _context.SaveChanges();
        }

        [HttpPost]
        public void ImportCards(List<Card> importItems)
        {
            Card temp = new Card();
            foreach (var item in importItems) {
                temp = new Card();
                temp.CardName = item.CardName;
                temp.Artist = item.Artist;
                temp.Expansion = item.Expansion;
                temp.CardText = item.CardText;
                temp.Rarity = item.Rarity;
                temp.Type = item.Type;
                temp.CardId = item.CardId;
                _context.Cards.Add(temp);
                _context.SaveChanges();
            }
        }

        [HttpPost]
        public void ImportSingleCard(Card item)
        {
            Card temp = new Card();
            
                temp = new Card();
                temp.CardName = item.CardName;
                temp.Artist = item.Artist;
                temp.Expansion = item.Expansion;
                temp.CardText = item.CardText;
                temp.Rarity = item.Rarity;
                temp.Type = item.Type;
                temp.CardId = item.CardId;
                _context.Cards.Add(temp);
                _context.SaveChanges();
            
        }

        [HttpPost]
        public void DeleteCard(Card card) {

            _context.Cards.Remove(card);
            _context.SaveChanges();
        }

        [HttpPost]
        public void UpdateCard(Card card)
        { 
            _context.Cards.Update(card);
            _context.SaveChanges();
        }



        [HttpGet]
        public Card getCard(Guid ID)
        {
            return _context.Cards.Where(x => x.Id == ID).ToList().FirstOrDefault();
        }

        [HttpGet]
        public List<Card> searchCard(string name)
        {
            return _context.Cards.Where(x => x.CardName.Contains(name)).ToList();
        }
    }

}

