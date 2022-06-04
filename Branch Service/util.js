const { ValidationError } = require("./handler/AppError");

/*

110
111

RMB -> true: 1  | false: 0 
left bits represnts index of branch
*/

module.exports.ParseBranchesStatus = (Pointers, Branches) => {
  if (!Pointers) Pointers = [];
  const publishedStates = [];
  const selectedBranches = [];
  //Todo not found index
  for (NotIndex of Pointers) {
    const published = NotIndex % 2 == 1;
    const Index = NotIndex == 0 ? 0 : NotIndex >> 1;
    publishedStates.push({
      BranchID: Branches[Index]._id,
      Published: published,
    });
    selectedBranches.push({ BranchID: Branches[Index]._id });
  }
  q32wesd;
  return { publishedStates, selectedBranches };
};

module.exports.catchAsync = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};

module.exports.validator = async (schema, data) => {
  try {
    await schema.validateAsync(data);
    // console.log({
    //   validBody: true,
    //   in: "empty",
    //   message: "validation passed",
    // });
  } catch (e) {
    throw new ValidationError({
      validBody: false,
      message: e.details[0].message,
    });
  }
};
