require('./sourcemap-register.js');/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 985:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const core = __nccwpck_require__(817);
const github = __nccwpck_require__(675);

if (require.main === require.cache[eval('__filename')]) {
  const getListReleases = (token) => github.getOctokit(token).repos.listReleases;
  run({
    getInput: core.getInput,
    setOutput: core.setOutput,
    listReleases: getListReleases,
    context: github.context.repo,
  });
}

async function run({
  getInput,
  setOutput,
  listReleases,
  context,
}) {
  core.setFailed("debugg")
  try {
    const token = getInput("token");

    console.info("Started retrieving releases");
    const request = listReleases(token);
    const { data } = await request(getInput("repo") ?? context);
    core.setFailed(data + " | " + getInput("repo"))

    const { changelog, latest } = getChangelogAndLatest(data, {getInput});

    setOutput("changelog", changelog);
    setOutput("latest", latest);
  } catch (error) {
    core.setFailed(error.message);
  }
}

function getChangelogAndLatest(releases, {getInput}) {
  if (!Array.isArray(releases)) {
    throw new Error(
      `Expected an array back as response, but got "${typeof releases}"`
    );
  }

  const spacing = "\n\n";
  const latest = { tag: null, date: null };
  const changelog = releases
    .map(({ tag_name, draft, published_at, name, body }) => {
      if (draft) {
        console.info(`Skipping draft with the name "${name}"`);
        return null;
      }

      const date = new Date(published_at);
      if (latest.date == null || date > latest.date) {
        latest.date = date;
        latest.tag = tag_name;
      }

      const title = formatTitle(name, getInput);
      const description = formatDescription(body, getInput);

      return [title, description].filter(Boolean).join(spacing);
    })
    .filter(Boolean)
    .join(spacing);

  return { changelog, latest: latest.tag };
}

function formatTitle(replace, getInput) {
  return format(getInput("title-template"), "%%TITLE%%", replace);
}

function formatDescription(replace, getInput) {
  return format(getInput("description-template"), "%%DESCRIPTION%%", replace);
}

function format(template, find, replace) {
  return template.replace(find, replace || "");
}

module.exports = { run, getChangelogAndLatest };


/***/ }),

/***/ 817:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 675:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(985);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map