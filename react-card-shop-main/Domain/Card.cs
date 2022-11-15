using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Card
    {
        public Guid Id { get; set; }
        public string Artist { get; set; }
        public string CardId { get; set; }
        public string CardName { get; set; }
        public string Expansion { get; set; }
        public string CardText { get; set; }

        public string Rarity { get; set; }

        public string Type { get; set; }

    }
}
