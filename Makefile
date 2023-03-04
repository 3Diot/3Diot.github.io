mkfile_path := $(abspath $(lastword $(MAKEFILE_LIST)))
current_dir := $(notdir $(patsubst %/,%,$(dir $(mkfile_path))))

hello:
	echo "Hello, World"

sitemap:
	node ./src/convert.js ./src/ipynb/ index,001_Legal,002_Parcels,003_Lore,004_Tutorials,005_Monetize,006_Websites ./src/posts/
#nbs2html ./src/ipynb/ index,001_Legal,002_Parcels,003_Lore,004_Tutorials,005_Monetize,006_Websites ./src/posts/

maker:
	make nb2py && make bump && make build && make pypi && make clean && make upd

# Bottomed used by top

upd:
	pip uninstall cvminigames && pip install cvminigames && make sitemap

nb2py:
	nb2py ./ipynb/_000_core.ipynb ./cvminigames/outp.py

bump:
	bump_version cvminigames/

build:
	python -m build $(dir $(mkfile_path))

pypi:
	twine upload --repository pypi ./dist/* --verbose

clean:
	if exist dist rmdir /Q /S dist && if exist cvminigames.egg-info rmdir /Q /S cvminigames.egg-info
