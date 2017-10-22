const {
  _,
  fluid,
  constants,
  log,
  handleError,
  validateArgs,
  createPromisedApi,
  createAbstractApi,
  buildUri
} = require('./_base')

/**
 * API doc: https://developer.atlassian.com/bitbucket/api/2/reference/
 * resource/repositories/%7Busername%7D/%7Brepo_slug%7D/branch-restrictions
 */
function createApi(api, opts = {}) {
  const result = createAbstractApi(api, opts)

  const localApi = {
    name: 'BranchRestrictions',

    /**
     * Get branch restrictions
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/
     * resource/repositories/%7Busername%7D/%7Brepo_slug%7D/branch-restrictions#get
     */
    get(username, repoSlug, callback) {
      validateArgs('create', [...arguments])
      const uri = buildUri(username, repoSlug, 'branch-restrictions')
      api.post(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Create branch restrictions
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} kind describes what will be restricted.
     *
     *
     * Allowed values for kind are: push, force, delete, and restrict_merges.
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/
     * resource/repositories/%7Busername%7D/%7Brepo_slug%7D/branch-restrictions#get
     */
    create(username, repoSlug, kind, callback) {
      validateArgs('create', [...arguments], 3)
      const uri = buildUri(username, repoSlug, 'branch-restrictions')
      const data = {
        kind
      }
      api.post(
        uri, data, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get branch restriction by id
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} restrictionId (id) of branch restriction
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/
     * resource/repositories/%7Busername%7D/%7Brepo_slug%7D/branch-restrictions/%7Bid%7D
     */
    getRestriction(username, repoSlug, restrictionId, callback) {
      validateArgs('create', [...arguments], 3)
      const uri = buildUri(username, repoSlug, `branch-restrictions/${restrictionId}`)
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Update branch restriction by id
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} restrictionId (id) of branch restriction
     * @param {Object} restrition object
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/
     * resource/repositories/%7Busername%7D/%7Brepo_slug%7D/branch-restrictions/%7Bid%7D
     */
    updateRestriction(username, repoSlug, restrictionId, restriction, callback) {
      validateArgs('create', [...arguments], 4)
      const uri = buildUri(username, repoSlug, `branch-restrictions/${restrictionId}`)
      const data = {
        _body: restriction
      }
      api.put(
        uri,
        data, null,
        result.$createListener(callback)
      )
    },

    /**
     * Remove branch restriction by id
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     * @param {String} restrictionId (id) of branch restriction
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/
     * resource/repositories/%7Busername%7D/%7Brepo_slug%7D/branch-restrictions/%7Bid%7D
     */
    removeRestriction(username, repoSlug, restrictionId, callback) {
      validateArgs('create', [...arguments], 3)
      const uri = buildUri(username, repoSlug, `branch-restrictions/${restrictionId}`)
      api.delete(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },
  }

  localApi.forProject = fluid(localApi, 2)
  localApi.forNode = fluid(localApi, 3)
  localApi.forComment = fluid(localApi, 4)
  localApi.promised = createPromisedApi(localApi, opts)
  return _.assign(result, localApi)
}

module.exports = {
  createApi,
  methods: [
    'get',
    'create',
    'getRestriction',
    'updateRestriction',
    'removeRestriction'
  ]
}