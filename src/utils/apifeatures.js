class APIFeatures {
    constructor(query, queryString) {
        this.query = query // Mongo query (Item.find())
        this.queryString = queryString // req.query
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ")
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort("-createdAt")
        }
        return this
    }

    textSearch() { //less flexible
        if (this.queryString.search) {
            this.query.find({
                $text: { $search: this.queryString.search }
            })
        }

        return this
    }

    search() {
        //Regex search - easy and felexible -> only for small datasets as slow for larger datasets
        if (this.queryString.search) {
            const searchQuery = this.queryString.search

            this.query = this.query.find({
                $or: [
                    { name: { $regex: searchQuery, $options: "i" } },
                    { description: { $regex: searchQuery, $options: "i" } }
                ]
            })
        }

        return this
    }

    filter() {
        const queryObj = { ...this.queryString }

        const excludedFields = ["page", "limit", "search", "sort"] //fields not required
        excludedFields.forEach(field => delete queryObj[field])

        const mongoFilter = {}

        Object.keys(queryObj).forEach(key => {
            if (key.includes("[")) {
                const field = key.split("[")[0]
                const op = key.split("[")[1].replace("]", "")

                if (!mongoFilter[field])
                    mongoFilter[field] = {}
                mongoFilter[field][`$${op}`] = Number(queryObj[key])
            } else {
                mongoFilter[key] = queryObj[key]
            }
        })

        // console.log(mongoFilter)
        this.query = this.query.find(mongoFilter)
        return this
    }

    //Offset based pagination: page=2&limit=10  --> skip 10 items, limit 10 items
    paginate() {
        const page = Number(this.queryString.page) || 1
        const limit = Number(this.queryString.limit) || 10
        const skip = (page - 1) * limit

        this.query = this.query.skip(skip).limit(limit) //adds .skip() and .limit() to the query
        return this
    }
}

export default APIFeatures