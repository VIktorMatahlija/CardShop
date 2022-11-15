using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Inventory
    {
        public Guid Id { get; set; }
        public Guid OwnerId { get; set; }
        public Guid CardId { get; set; }

        public string SellerName { get; set; }
        public string CardName { get; set; }


        public int Amount { get; set; }

        //Price is set as euro and will be recalculated on the front end
        public double Price { get; set; }

    }
}
