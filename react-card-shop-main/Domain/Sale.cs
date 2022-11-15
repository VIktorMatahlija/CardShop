using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Sale
    {
        public Guid Id { get; set; }
        public Guid SellerId { get; set; }
        public Guid BuyerId { get; set; }
        public Guid CardId { get; set; }
        public double Price { get; set; }
        public DateTime SaleTime { get; set; }
        

    }
}
