package com.demo

import android.os.Bundle
import android.view.View
import android.webkit.*
import android.widget.Button
import android.widget.LinearLayout
import com.facebook.react.ReactActivity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule

import android.net.http.SslError

class MainActivity : ReactActivity() {

    public lateinit var webView: WebView
    public lateinit var layout: LinearLayout
    public lateinit var loadButton: Button

    

    override fun getMainComponentName(): String = "demo"
}