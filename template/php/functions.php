<?php
/**
 * Theme functions and definitions
 */

// Enqueue styles and scripts
function theme_enqueue_scripts() {
    // Enqueue the main stylesheet
    wp_enqueue_style('react-app', get_template_directory_uri() . '/style.css', array(), '1.0.0');
    
    // Enqueue the React bundle
    wp_enqueue_script('react-app', get_template_directory_uri() . '/bundle.js', array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'theme_enqueue_scripts');

// Add theme support
function theme_setup() {
    // Add support for title tag
    add_theme_support('title-tag');
    
    // Add support for post thumbnails
    add_theme_support('post-thumbnails');
    
    // Add support for HTML5
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
}
add_action('after_setup_theme', 'theme_setup');
?>
