mkfile_path := $(abspath $(lastword $(MAKEFILE_LIST)))
current_dir := $(notdir $(patsubst %/,%,$(dir $(mkfile_path))))

hello:
	echo "Hello, World"

mainsitemap:
	node ./src/convert_sitemap.mjs ./src/ipynb/ ./src/posts/ sitemap index,Parcels,Lore,Tutorials,Monetize,Websites

secondsitemap:
	node ./src/convert_sitemap.mjs ./src/ipynb/ ./src/posts/ secondmap index,Legal

remainder:
	node ./src/convert_sitemap.mjs ./src/ipynb/ ./src/posts/ remainder Legal
