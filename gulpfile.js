import gulp from 'gulp'
import concat from 'gulp-concat'
import clean from 'gulp-clean'
import browserSync from 'browser-sync'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import imagemin from 'gulp-imagemin'
import uglify from 'gulp-uglify'
import cleanCSS from 'gulp-clean-css'
import rename from 'gulp-rename'
import gulpif from 'gulp-if'
import minifyjs from 'gulp-js-minify'

const sass = gulpSass(dartSass)
browserSync.create()

/***** PATHS ****/

const path = {
	src: {
		scss: './src/scss/**/*.scss',
		js: './src/js/*.js',
		img: './src/images/*',
	},
	dist: {
		self: './dist/',
		css: './dist/css/',
		js: './dist/js/',
		img: './dist/images/',
	},

	setEnv() {
		this.isProd = process.argv.includes("--prod")
		this.isDev = !this.isProd
	},
}

path.setEnv()

/***** FUNCTIONS ****/


const buildScss = () =>
	gulp
	.src(path.src.scss)
	.pipe(sass().on('error', sass.logError))
	.pipe(gulpif(path.isProd, autoprefixer({
		cascade: false
	})))
	.pipe(gulpif(path.isProd, cleanCSS({
		compatibility: 'ie8'
	})))
	.pipe(rename("style.min.css"))
	.pipe(gulp.dest(path.dist.css))
	.pipe(browserSync.stream())


const buildJs = () =>
	gulp.src(path.src.js)
	.pipe(concat('main.js'))
	.pipe(gulpif(path.isProd, uglify()))
	.pipe(minifyjs())
	.pipe(rename("scripts.min.js"))
	.pipe(gulp.dest(path.dist.js))
	.pipe(browserSync.stream())

const buildImgs = () =>
	gulp.src(path.src.img)
	.pipe(imagemin())
	.pipe(gulp.dest(path.dist.img))

const cleanBuild = () => gulp.src(path.dist.self, {
	allowEmpty: true
}).pipe(clean())

const watcher = () => {
	browserSync.init({
		server: {
			baseDir: './',
		},
	})

	gulp.watch('./index.html').on('change', browserSync.reload)
	gulp.watch(path.src.scss, buildScss).on('change', browserSync.reload)
	gulp.watch(path.src.js, buildJs).on('change', browserSync.reload)
	gulp.watch(path.src.img, buildImgs).on('change', browserSync.reload)
}


/***** TASK ****/

gulp.task('dev', gulp.series(buildScss, buildJs, watcher))
gulp.task('build', gulp.series(cleanBuild, buildScss, buildJs, buildImgs))