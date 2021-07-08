// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,

    /* This method randomly changes one base in the current organism's dna. We create an array of DNA base values and then create a random index based on the length of the dna array which is 15. We identify the  random base to change and then use 'indexOf()' and then 'splice()' to remove the duplicate base from our dnaBases array. We create another random index and set our organisms dna at our original random index to one of the 3 other base types. */

    mutate() {
      let dnaBases = ["A", "T", "C", "G"];
      let pAequorRandomIndex = Math.floor(Math.random() * 15);

      let duplicateBaseIndex = dnaBases.indexOf(this.dna[pAequorRandomIndex]);
      dnaBases.splice(duplicateBaseIndex, 1);

      let randomIndex = Math.floor(Math.random() * 3);

      this.dna[pAequorRandomIndex] = dnaBases[randomIndex];
    },

    /* Console log a message to compare identical DNA base location between the current organism's DNA to a another organisms's DNA. We use a 'for loop' to increase a counter when exact index values are true for both arrays. Finally, we caluclate the percentage out of the DNA length and print a message. */
    compareDNA(pAequor) {
      let counter = 0;
      for (let i = 0; i < 15; i++) {
        if (this.dna[i] === pAequor.dna[i]) {
          counter++;
        }
      }
      const samePercentDNA = ((counter / 15) * 100).toFixed(2);
      console.log(
        `specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${samePercentDNA}% DNA in common.`
      );
    },

    /*Returns a boolean value on whether the current organism has sufficient DNA composition to survive. We create a counter and iterate through the current organism's dna array and increase the counter when either base 'C' or 'G' is found. We calculate a percentage and return 'true' if the percentage is greater than 60% */
    willLikelySurvive() {
      let targetBaseCounter = 0;

      this.dna.map((base) => {
        if (base === "C" || base === "G") {
          targetBaseCounter++;
        }
      });

      const percentage = (targetBaseCounter / 15).toFixed(2);

      return percentage > 0.6;
    },
  };
};

/*We create an array for organisms objects that have survivavable DNA. We then use a while loop to create new organisms and add ones to our array that pass the 'willLikelySurvive' method. Our loop will end once our array has 30 organism objects. */

let survivavleOrgansimsArray = [];

let id = 1;

while (survivavleOrgansimsArray.length < 30) {
  let newOrganism = pAequorFactory(id, mockUpStrand());

  if (newOrganism.willLikelySurvive()) {
    survivavleOrgansimsArray.push(newOrganism);
  }
  id++;
}

console.log(survivavleOrgansimsArray);
