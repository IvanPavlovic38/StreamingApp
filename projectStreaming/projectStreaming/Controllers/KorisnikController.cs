using projectStreaming.Data;
using projectStreaming.models;
using Microsoft.AspNetCore.Mvc;

namespace projectStreaming.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class KorisnikController : ControllerBase
    {

        private readonly StreamingContext _context;

        /// <param name="context"></param>
        public KorisnikController(StreamingContext context)
        {
            _context = context;
        }


        /// <returns>Korisnici u bazi</returns>
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
                var korisnici = _context.Korisnici.ToList();
                if (korisnici == null || korisnici.Count() == 0)
                {
                    return new EmptyResult();
                }
                return new JsonResult(korisnici);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }


        /// <param name="korisnik">Korisnik za unijeti u JSON formatu</param>
        /// <response code="201">Kreirano</response>
        /// <response code="400">Zahtjev nije valjan (BadRequest)</response> 
        /// <response code="503">Baza nedostupna iz razno raznih razloga</response> 
        /// <returns>Korisnik s šifrom koju je dala baza</returns>
        [HttpPost]
        public IActionResult Post(Korisnik korisnik)
        {
            if (!ModelState.IsValid || korisnik == null)
            {
                return BadRequest();
            }
            try
            {
                _context.Korisnici.Add(korisnik);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, korisnik);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }


        /// <param name="sifra">Šifra korisnika koja se mijenja</param>  
        /// <param name="korisnik">Korisnik za unijeti u JSON formatu</param>  
        /// <returns>Svi poslani podaci od korisnika koji su spremljeni u bazi</returns>
        /// <response code="200">Sve je u redu</response>
        /// <response code="204">Nema u bazi korisnika kojeg želimo promijeniti</response>
        /// <response code="415">Nismo poslali JSON</response> 
        /// <response code="503">Baza nedostupna</response> 
        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, Korisnik korisnik)
        {
            if (sifra <= 0 || !ModelState.IsValid || korisnik == null)
            {
                return BadRequest();
            }


            try
            {


                var korisnikIzBaze = _context.Korisnici.Find(sifra);

                if (korisnikIzBaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }



                korisnikIzBaze.KorisnickoIme = korisnik.KorisnickoIme;
                korisnikIzBaze.Lozinka = korisnik.Lozinka;
                korisnikIzBaze.Email = korisnik.Email;
                korisnikIzBaze.Jezik = korisnik.Jezik;

                _context.Korisnici.Update(korisnikIzBaze);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, korisnikIzBaze);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }

        }



        /// <param name="sifra">Šifra korisnika koja se briše</param>  
        /// <returns>Odgovor da li je obrisano ili ne</returns>
        /// <response code="200">Sve je u redu, obrisano je u bazi</response>
        /// <response code="204">Nema u bazi korisniak kojeg želimo obrisati</response>
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
                var korisnikIzBaze = _context.Korisnici.Find(sifra);

                if (korisnikIzBaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }

                _context.Korisnici.Remove(korisnikIzBaze);
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