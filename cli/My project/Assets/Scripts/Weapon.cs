using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Weapon : MonoBehaviour
{
    [SerializeField]
    private float moveSpeed = 10f;

    void Start() {
        Destroy(gameObject, 1f);
    }
    void Update()
    {
        // 매 프레임 호출
        transform.position += Vector3.up * moveSpeed * Time.deltaTime;
    }
}
