const ERROR = "Error @ Controllers/Flights";

async function fillDB(seed, Model, bundleNum) {
  try {
    const header = seed.next().toString().toLowerCase().split(",");
    let line;
    let lineNum = 1;
    let bundle = [];

    while ((line = seed.next())) {
      const newObj = {};
      const stringLine = line.toString().split(",");
      stringLine.forEach((element, index) => {
        newObj[header[index]] = isNaN(Number(element))
          ? element === ""
            ? null
            : element
          : Number(element);
      });

      Model.create(newObj)
        .then((newObjInDB) => {
          bundle.push(newObjInDB);
        })
        .catch((error) => console.log(error));

      if (lineNum === bundleNum) {
        await Promise.all(bundle);
        bundle = [];
        lineNum = 1;
        return;
      } else lineNum++;
    }

    if (bundle.length !== 0) await Promise.all(bundle);
  } catch (e) {
    console.error(`${ERROR}, fillDB --→ ${e.message}`);
  }
}

module.exports = fillDB;
