import { schema } from "@uniswap/token-lists";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import mainnetTokenList from "./mauve.tokenlist.mainnet.json";
import optimismGoerliTokenList from "./mauve.tokenlist.optimism-goerli.json";

async function validate(tokenList) {
  const ajv = new Ajv({ allErrors: true, verbose: true });
  addFormats(ajv);
  const validator = ajv.compile(schema);
  const valid = validator(tokenList);
  if (valid) {
    return valid;
  }
  if (validator.errors) {
    throw validator.errors.map((error) => {
      delete error.data;
      return error;
    });
  }
}

validate(mainnetTokenList)
  .then(console.log("Valid List."))
  .catch(console.error);
validate(optimismGoerliTokenList)
  .then(console.log("Valid List."))
  .catch(console.error);
