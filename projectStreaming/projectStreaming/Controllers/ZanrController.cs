using projectStreaming.data;
using projectStreaming.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace projectStreaming.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class ZanrController : ControllerBase
    {

        private readonly StreamingContext _context;

        /// <param name="context"></param>
        public ZanrController(StreamingContext context)
        {
            _context = context;
        }


        /// <returns>Žanrovi u bazi</returns>
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
                var zanrovi = _context.Zanrovi.ToList();
                if (zanrovi == null || zanrovi.Count == 0)
                {
                    return new EmptyResult();
                }
                return new JsonResult(zanrovi);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }


        /// <param name="serija">Žanr za unijeti u JSON formatu</param>
        /// <response code="201">Kreirano</response>
        /// <response code="400">Zahtjev nije valjan (BadRequest)</response> 
        /// <response code="503">Baza nedostupna iz razno raznih razloga</response> 
        /// <returns>Žanr s šifrom koju je dala baza</returns>
        [HttpPost]
        public IActionResult Post(Zanr zanr)
        {
            if (!ModelState.IsValid || zanr == null)
            {
                return BadRequest();
            }
            try
            {
                _context.Zanrovi.Add(zanr);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, zanr);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }


        /// <param name="sifra">Šifra žanra koja se mijenja</param>  
        /// <param name="smjer">Smjer za unijeti u JSON formatu</param>  
        /// <returns>Svi poslani podaci od žanra koji su spremljeni u bazi</returns>
        /// <response code="200">Sve je u redu</response>
        /// <response code="204">Nema u bazi žanra koje želimo promijeniti</response>
        /// <response code="415">Nismo poslali JSON</response> 
        /// <response code="503">Baza nedostupna</response> 
        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, Zanr zanr)
        {
            if (sifra <= 0 || !ModelState.IsValid || zanr == null)
            {
                return BadRequest();
            }


            try
            {


                var zanrIzBaze = _context.Zanrovi.Find(sifra);

                if (zanrIzBaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }



                zanrIzBaze.Naziv = zanr.Naziv;

                _context.Zanrovi.Update(zanrIzBaze);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, zanrIzBaze);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }

        }



        /// <param name="sifra">Šifra žanra koja se briše</param>  
        /// <returns>Odgovor da li je obrisano ili ne</returns>
        /// <response code="200">Sve je u redu, obrisano je u bazi</response>
        /// <response code="204">Nema u bazi žanra koje želimo obrisati</response>
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
                var zanrIzBaze = _context.Zanrovi.Find(sifra);

                if (zanrIzBaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }

                _context.Zanrovi.Remove(zanrIzBaze);
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