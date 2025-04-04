package com.reactnativedemo

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class WebViewModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "WebViewModule"
    }

    @ReactMethod
    fun showWebView(url: String) {
        currentActivity?.let { activity ->
            (activity as? MainActivity)?.showWebView(url)
        } ?: run {
            println("Error: currentActivity is null")
        }
    }

    @ReactMethod
    fun hideWebView() {
        currentActivity?.let { activity ->
            (activity as? MainActivity)?.hideWebView()
        } ?: run {
            println("Error: currentActivity is null")
        }
    }
}