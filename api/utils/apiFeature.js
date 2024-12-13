class ApiFeature {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }
  //pagination
  pagination(documentCount) {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 12;
    const skip = (page - 1) * limit;
    //pagination result
    const pagination = {};
    pagination.limit = limit;
    //pages count
    const pages = Math.ceil(documentCount / limit);
    pagination.pages = pages;
    //next page
    if (page < pages) {
      pagination.next = page + 1;
    }
    //prev page
    if (page > 1) {
      pagination.prev = page - 1;
    }
    //current page
    pagination.page = page;

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    this.paginationResult = pagination;

    return this;
  }
  //filter
  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields", "keyword"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|in)\b/g,
      (match) => `$${match}`
    );

    const parsedQuery = JSON.parse(queryStr);

    // Generalize to handle both numbers and strings for `$in`
    Object.keys(parsedQuery).forEach((key) => {
      if (parsedQuery[key].$in && typeof parsedQuery[key].$in === "string") {
        parsedQuery[key].$in = parsedQuery[key].$in.split(",").map((item) => {
          return isNaN(item) ? item.trim() : Number(item);
        });
      }
    });

    console.log(parsedQuery);

    this.mongooseQuery = this.mongooseQuery.find(parsedQuery);
    return this;
  }

  //sort
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }
    return this;
  }

  //fields
  fields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }

  //keyword
  search(modelName) {
    if (this.queryString.keyword) {
      let query = {};
      if (modelName === "Product") {
        query.$or = [
          { title: { $regex: this.queryString.keyword, $options: "i" } },
          { description: { $regex: this.queryString.keyword, $options: "i" } },
        ];
      } else {
        query = { name: { $regex: this.queryString.keyword, $options: "i" } };
      }
      this.mongooseQuery = this.mongooseQuery.find(query);
    }
    return this;
  }
}

module.exports = ApiFeature;
