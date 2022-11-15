using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application
{
	public class Hasher
	{
        //https://stackoverflow.com/questions/33546552/generate-password-hash
        public static string Hash(string password)
        {
            var bytes = new System.Text.UTF8Encoding().GetBytes(password);
            var hashBytes = System.Security.Cryptography.MD5.Create().ComputeHash(bytes);
            return Convert.ToBase64String(hashBytes);
        }

    }
}
