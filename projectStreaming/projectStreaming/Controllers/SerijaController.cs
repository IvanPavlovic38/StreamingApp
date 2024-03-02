using projectStreaming.data;
using projectStreaming.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace projectStreaming.Controllers
{
    
    [ApiController]
    [Route("api/v1/[controller]")]
    public class SerijaController : ControllerBase
    {
        
        private readonly StreamingContext _context;
        
        /// <param name="context"></param>
        public SerijaController(StreamingContext context)
        {
            _context = context;
        }

       
        /// <remarks>
        /// Primjer upita
        /// 
        ///    GET api/v1/Serija
        ///    
        /// </remarks>
        /// <returns>Serije u bazi</returns>
        /// <response code="200">Sve OK, ako nema podataka content-length: 0 </response>
        /// <response code="400">Zahtjev nije valjan</response>
        /// <response code="503">Baza na koju se spajam nije dostupna</response>
        [HttpGet]
        public IActionResult Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var serije = _context.Serije.ToList();
                if (serije==null || serije.Count == 0)
                {
                    return new EmptyResult();
                }
                return new JsonResult(serije);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }

        
        /// <remarks>
        ///     POST api/v1/Serija
        ///     {naziv: "Primjer naziva"}
        /// </remarks>
        /// <param name="serija">Serija za unijeti u JSON formatu</param>
        /// <response code="201">Kreirano</response>
        /// <response code="400">Zahtjev nije valjan (BadRequest)</response> 
        /// <response code="503">Baza nedostupna iz razno raznih razloga</response> 
        /// <returns>Serija s šifrom koju je dala baza</returns>
        [HttpPost]
        public IActionResult Post(Serija serija)
        {
            if (!ModelState.IsValid || serija==null)
            {
                return BadRequest();
            }
            try
            {
                _context.Serije.Add(serija);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, serija);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }

 
        /// <remarks>
        ///    PUT api/v1/serija/1
        /// </remarks>
        /// <param name="sifra">Šifra serije koja se mijenja</param>  
        /// <param name="smjer">Smjer za unijeti u JSON formatu</param>  
        /// <returns>Svi poslani podaci od serije koji su spremljeni u bazi</returns>
        /// <response code="200">Sve je u redu</response>
        /// <response code="204">Nema u bazi serije koje želimo promijeniti</response>
        /// <response code="415">Nismo poslali JSON</response> 
        /// <response code="503">Baza nedostupna</response> 
        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, Serija serija)
        {
            if (sifra<=0 || !ModelState.IsValid || serija == null)
            {
                return BadRequest();
            }


            try
            {


                var serijaIzBaze = _context.Serije.Find(sifra);

                if (serijaIzBaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }


                
                serijaIzBaze.Naziv = serija.Naziv;
                serijaIzBaze.Opis= serija.Opis;

                _context.Serije.Update(serijaIzBaze);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, serijaIzBaze);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }

        }



        /// <param name="sifra">Šifra serije koja se briše</param>  
        /// <returns>Odgovor da li je obrisano ili ne</returns>
        /// <response code="200">Sve je u redu, obrisano je u bazi</response>
        /// <response code="204">Nema u bazi serije koje želimo obrisati</response>
        /// <response code="503">Problem s bazom</response> 
        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            if (!ModelState.IsValid || sifra <= 0)
            {
                return BadRequest();
            }

            try
            {
                var serijaIzBaze = _context.Serije.Find(sifra);

                if (serijaIzBaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }

                _context.Serije.Remove(serijaIzBaze);
                _context.SaveChanges();

                return new JsonResult(new { poruka = "Obrisano" }); 

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }

        }



    }
}